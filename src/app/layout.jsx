// Import Google font "Cutive Mono" from Next.js font package
import { Cutive_Mono } from "@next/font/google";

// Import ThemeProvider with a theme switcher for dark/light mode support
import { ThemeProviderWithSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";

// Import main layout components
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

// Import global CSS styles
import "@/app/globals.css";

// Initialize "Cutive Mono" font with specific configuration
const cutiveMono = Cutive_Mono({
  weight: "400",                // Set font weight to 400 for normal text styling
  subsets: ["latin"],           // Limit to Latin character set for performance
  display: "swap",              // Minimize layout shift by swapping font as it loads
});

/**
 * RootLayout - Component to wrap the entire application with a consistent layout.
 * Includes global styles, theme provider with dark/light mode support, and common layout components.
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - The content to be rendered within the layout
 * @returns {JSX.Element} Root layout wrapping children with navbar, theme provider, and footer
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cutiveMono.className} suppressHydrationWarning>
    <body className="bg-lightBackground dark:bg-darkBackground overflow-x-hidden">
    {/* ThemeProviderWithSwitcher enables theme toggle between light and dark modes */}
    <ThemeProviderWithSwitcher>
      <Navbar />  {/* Navbar component for primary navigation */}

      {/* Main content area with responsive horizontal margins */}
      <main className="min-h-screen my-8 mx-8 sm:mx-20 md:mx-32 lg:mx-60 xl:mx-80">
        {children}
      </main>

      {/* Footer component with responsive top margin */}
      <Footer className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16" />
    </ThemeProviderWithSwitcher>
    </body>
    </html>
  );
}
