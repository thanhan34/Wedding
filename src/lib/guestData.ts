import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface GuestInfo {
  id?: string; // Firebase document ID
  slug: string;
  name: string;
  title: string; // Anh/Chị/Bạn/Cô/Chú/etc.
  personalMessage: string;
  relationship: string; // bạn bè/đồng nghiệp/họ hàng/etc.
  invitedTo: 'groom' | 'bride'; // được mời tham dự bên nào
  specialNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const COLLECTION_NAME = 'guests';

// Danh sách khách mời mặc định (để khởi tạo)
const defaultGuestList: Omit<GuestInfo, 'id'>[] = [
  {
    slug: 'nguyen-van-a',
    name: 'Nguyễn Văn A',
    title: 'Anh',
    personalMessage: 'Cảm ơn anh đã luôn là người bạn tốt và đồng hành cùng chúng mình trong suốt thời gian qua. Sự hiện diện của anh trong ngày trọng đại này sẽ làm cho đám cưới của chúng mình thêm ý nghĩa và trọn vẹn.',
    relationship: 'bạn thân',
    invitedTo: 'groom',
    createdAt: new Date()
  },
  {
    slug: 'tran-thi-b',
    name: 'Trần Thị B',
    title: 'Chị',
    personalMessage: 'Chị luôn là người chị gái tuyệt vời mà chúng em rất quý mến. Những lời khuyên và sự động viên của chị đã giúp chúng em rất nhiều. Chúng em rất mong chị sẽ có mặt để chứng kiến hạnh phúc của chúng em.',
    relationship: 'đồng nghiệp',
    invitedTo: 'bride',
    createdAt: new Date()
  },
  {
    slug: 'le-minh-c',
    name: 'Lê Minh C',
    title: 'Bạn',
    personalMessage: 'Bạn là người bạn thân thiết từ thời học sinh. Những kỷ niệm đẹp chúng ta đã cùng nhau trải qua sẽ mãi là những điều đáng nhớ. Mong bạn sẽ tiếp tục đồng hành cùng chúng mình trong chương mới của cuộc đời.',
    relationship: 'bạn học',
    invitedTo: 'groom',
    createdAt: new Date()
  },
  {
    slug: 'pham-thi-d',
    name: 'Phạm Thị D',
    title: 'Cô',
    personalMessage: 'Cô luôn là người cô gái đáng yêu và tài năng mà chúng cháu rất ngưỡng mộ. Sự quan tâm và yêu thương của cô dành cho gia đình chúng cháu thật sự rất ý nghĩa. Chúng cháu rất mong cô sẽ có mặt trong ngày vui này.',
    relationship: 'họ hàng',
    invitedTo: 'bride',
    createdAt: new Date()
  },
  {
    slug: 'hoang-van-e',
    name: 'Hoàng Văn E',
    title: 'Chú',
    personalMessage: 'Chú luôn là tấm gương sáng cho chúng cháu noi theo. Những kinh nghiệm sống và lời khuyên quý báu của chú đã giúp chúng cháu trưởng thành hơn. Chúng cháu rất vinh dự khi có chú tham dự đám cưới.',
    relationship: 'họ hàng',
    invitedTo: 'groom',
    createdAt: new Date()
  }
];

// Hàm lấy thông tin khách mời từ slug
export async function getGuestInfo(slug: string): Promise<GuestInfo | null> {
  try {
    const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as GuestInfo;
  } catch (error) {
    console.error('Error getting guest info:', error);
    return null;
  }
}

// Hàm lấy tất cả khách mời
export async function getAllGuests(): Promise<GuestInfo[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GuestInfo[];
  } catch (error) {
    console.error('Error getting all guests:', error);
    return [];
  }
}

// Hàm thêm khách mời mới
export async function addGuest(guest: Omit<GuestInfo, 'id'>): Promise<string | null> {
  try {
    // Kiểm tra slug đã tồn tại chưa
    const existingGuest = await getGuestInfo(guest.slug);
    if (existingGuest) {
      throw new Error('Slug đã tồn tại. Vui lòng chọn tên khác.');
    }

    const guestData = {
      ...guest,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), guestData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding guest:', error);
    throw error;
  }
}

// Hàm cập nhật khách mời
export async function updateGuest(id: string, updates: Partial<GuestInfo>): Promise<void> {
  try {
    const guestRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(guestRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    throw error;
  }
}

// Hàm xóa khách mời
export async function deleteGuest(id: string): Promise<void> {
  try {
    const guestRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(guestRef);
  } catch (error) {
    console.error('Error deleting guest:', error);
    throw error;
  }
}

// Hàm tạo slug từ tên
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ lại chữ cái, số, khoảng trắng và dấu gạch ngang
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ nhiều dấu gạch ngang liên tiếp
    .trim();
}

// Hàm tạo URL cá nhân hóa
export function createPersonalizedUrl(guest: GuestInfo, baseUrl: string = ''): string {
  return `${baseUrl}/${guest.slug}`;
}

// Hàm khởi tạo dữ liệu mặc định (chỉ chạy một lần)
export async function initializeDefaultGuests(): Promise<void> {
  try {
    const existingGuests = await getAllGuests();
    
    // Nếu đã có dữ liệu thì không khởi tạo nữa
    if (existingGuests.length > 0) {
      return;
    }

    // Thêm từng khách mời mặc định
    for (const guest of defaultGuestList) {
      await addGuest(guest);
    }
    
    console.log('Initialized default guests successfully');
  } catch (error) {
    console.error('Error initializing default guests:', error);
  }
}

// Hàm tìm kiếm khách mời
export async function searchGuests(searchTerm: string, filterBy?: 'groom' | 'bride'): Promise<GuestInfo[]> {
  try {
    let q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    
    if (filterBy) {
      q = query(collection(db, COLLECTION_NAME), where('invitedTo', '==', filterBy), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const allGuests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as GuestInfo[];

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      return allGuests.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.relationship.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allGuests;
  } catch (error) {
    console.error('Error searching guests:', error);
    return [];
  }
}
