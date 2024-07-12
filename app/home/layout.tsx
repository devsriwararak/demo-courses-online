import { FooterHome } from "../components/home/footer";
import { HeaderHome } from "../components/home/header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" flex flex-col min-h-screen ">
      <div className=" sticky top-0 z-50">
        <HeaderHome />
      </div>
      <div>
      {children}
      </div>
      <FooterHome />
    </div>
  );
}
