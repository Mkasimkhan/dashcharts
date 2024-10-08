import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     loader: 'jsx',  // Use 'jsx' loader for JSX syntax in .js files
//     include: /src\/.*\.js$/,  // Apply only to .js files inside the 'src' folder
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],  // Add .jsx as a resolvable extension
//   },
// });
export default defineConfig({
  plugins: [react()],
});