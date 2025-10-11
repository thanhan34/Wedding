import { Metadata } from 'next';
import { getGuestInfo } from '../../lib/guestData';

type Props = {
  params: Promise<{ guest: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guest: guestSlug } = await params;
  
  try {
    const guestInfo = await getGuestInfo(guestSlug);
    
    if (!guestInfo) {
      return {
        title: "Thanh An 💞 Thanh Ngân Wedding",
        description: "Trang web đám cưới của Thanh An và Thanh Ngân. Xem thông tin sự kiện, RSVP, và gửi lời chúc mừng.",
      };
    }

    return {
      title: `Thanh An 💞 Thanh Ngân Wedding - Kính mời ${guestInfo.title} ${guestInfo.name}`,
      description: `Trang web đám cưới của Thanh An và Thanh Ngân. Xem thông tin sự kiện, RSVP, và gửi lời chúc mừng cho Thanh An và Thanh Ngân.`,
      openGraph: {
        title: `Thanh An 💞 Thanh Ngân Wedding - Kính mời ${guestInfo.title} ${guestInfo.name}`,
        description: `Trang web đám cưới của Thanh An và Thanh Ngân. Xem thông tin sự kiện, RSVP, và gửi lời chúc mừng cho Thanh An và Thanh Ngân.`,
        type: 'website',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Thanh An 💞 Thanh Ngân Wedding",
      description: "Trang web đám cưới của Thanh An và Thanh Ngân. Xem thông tin sự kiện, RSVP, và gửi lời chúc mừng.",
    };
  }
}

export default function GuestLayout({ children }: Props) {
  return <>{children}</>;
}
