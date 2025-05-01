import Navbar from '@/components/Navbar';
import BannerHome from '@/components/BannerHome';
import ContentFind from '@/components/ContentFind';
import SectionQuemSomos from '@/components/SectionQuemSomos';
import CarrosselOngs from '@/components/CarrosselOngs';
import CarrosselDoacoes from '@/components/CarrosselDoacoes';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <BannerHome />
        <ContentFind />
        <SectionQuemSomos />
        <CarrosselOngs />
        <CarrosselDoacoes />
      </main>
        <Footer />
    </>
  );
}