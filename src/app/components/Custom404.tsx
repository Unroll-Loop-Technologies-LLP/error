import App from "../App";

/**
 * Custom 404 Page Component
 *
 * This component can be used as a drop-in replacement for 404 pages
 * in Next.js, Vite, or other React applications.
 *
 * For Next.js:
 * - Create pages/404.tsx and import this component
 *
 * For Vite/React Router:
 * - Add a catch-all route that renders this component
 *
 * Example usage:
 * ```tsx
 * // In Next.js pages/404.tsx
 * import Custom404 from '@/app/components/Custom404'
 * export default Custom404
 * ```
 */
export default function Custom404() {
  return <App />;
}
