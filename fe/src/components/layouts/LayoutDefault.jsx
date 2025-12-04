import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

export default function LayoutDefault() {
	return (
		<dev className="min-h-screen flex flex-col">
			<Header></Header>
			<main className="py-10 px-38">
				<Outlet />
			</main>

			<Footer></Footer>
		</dev>
	);
}
