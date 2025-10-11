import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface GiftInfo {
  id?: string;
  guestId?: string;
  guestName: string;
  amount: number;
  message?: string;
  recipient: 'bride' | 'groom';
  createdAt: Date;
  bankAccount?: string;
}

const COLLECTION_NAME = 'gifts';

// Thêm quà tặng mới
export async function addGift(gift: Omit<GiftInfo, 'id'>): Promise<string | null> {
  try {
    const giftData = {
      ...gift,
      createdAt: Timestamp.fromDate(gift.createdAt)
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), giftData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding gift:', error);
    throw error;
  }
}

// Lấy tất cả quà tặng
export async function getAllGifts(): Promise<GiftInfo[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as GiftInfo;
    });
  } catch (error) {
    console.error('Error getting all gifts:', error);
    return [];
  }
}

// Lấy quà tặng theo người nhận (cô dâu/chú rể)
export async function getGiftsByRecipient(recipient: 'bride' | 'groom'): Promise<GiftInfo[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('recipient', '==', recipient),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date()
      } as GiftInfo;
    });
  } catch (error) {
    console.error('Error getting gifts by recipient:', error);
    return [];
  }
}

// Tính tổng số tiền quà tặng
export async function getTotalAmount(recipient?: 'bride' | 'groom'): Promise<number> {
  try {
    const gifts = recipient 
      ? await getGiftsByRecipient(recipient)
      : await getAllGifts();
    
    return gifts.reduce((total, gift) => total + gift.amount, 0);
  } catch (error) {
    console.error('Error calculating total amount:', error);
    return 0;
  }
}

// Đếm số lượng quà tặng
export async function getGiftCount(recipient?: 'bride' | 'groom'): Promise<number> {
  try {
    const gifts = recipient 
      ? await getGiftsByRecipient(recipient)
      : await getAllGifts();
    
    return gifts.length;
  } catch (error) {
    console.error('Error getting gift count:', error);
    return 0;
  }
}

// Format số tiền
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

// Thống kê quà tặng
export interface GiftStats {
  totalAmount: number;
  totalCount: number;
  brideAmount: number;
  brideCount: number;
  groomAmount: number;
  groomCount: number;
  averageAmount: number;
}

export async function getGiftStats(): Promise<GiftStats> {
  try {
    const allGifts = await getAllGifts();
    const brideGifts = allGifts.filter(g => g.recipient === 'bride');
    const groomGifts = allGifts.filter(g => g.recipient === 'groom');

    const totalAmount = allGifts.reduce((sum, g) => sum + g.amount, 0);
    const brideAmount = brideGifts.reduce((sum, g) => sum + g.amount, 0);
    const groomAmount = groomGifts.reduce((sum, g) => sum + g.amount, 0);

    return {
      totalAmount,
      totalCount: allGifts.length,
      brideAmount,
      brideCount: brideGifts.length,
      groomAmount,
      groomCount: groomGifts.length,
      averageAmount: allGifts.length > 0 ? totalAmount / allGifts.length : 0
    };
  } catch (error) {
    console.error('Error getting gift stats:', error);
    return {
      totalAmount: 0,
      totalCount: 0,
      brideAmount: 0,
      brideCount: 0,
      groomAmount: 0,
      groomCount: 0,
      averageAmount: 0
    };
  }
}
