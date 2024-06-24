import { FooterHome } from "./components/home/footer";
import { HeaderHome } from "./components/home/header";
import HomePage from "./components/home/home";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderHome />
      <HomePage />
      <FooterHome />
    </div>
  );
}
