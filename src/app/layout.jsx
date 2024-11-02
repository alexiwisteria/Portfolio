import { Cutive_Mono } from "@next/font/google";
import { ThemeProviderWithSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css";

const cutiveMono = Cutive_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap", // Ensures font loads with minimal layout shift
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cutiveMono.className} suppressHydrationWarning>
    <body className="bg-lightBackground dark:bg-darkBackground overflow-x-hidden">
    <ThemeProviderWithSwitcher>
      <Navbar />
      <main className="min-h-screen my-8 mx-4 sm:mx-12 sm:my-10 md:mx-24 md:my-12 lg:mx-48 lg:my-14 xl:mx-96 xl:my-16">
        {children}
      </main>
      <Footer className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16" />
    </ThemeProviderWithSwitcher>
    </body>
    </html>
  );
}
