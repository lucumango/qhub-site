import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MathJaxProvider from '@/components/MathRenderer'

createRoot(document.getElementById("root")!).render(
	<MathJaxProvider>
		<App />
	</MathJaxProvider>
);