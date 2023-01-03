import Menu from '../../components/menu';
import DotBox from "../../components/dotbox";

export default function NimBoard() {
    return (
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <DotBox />
            </main>
        </div>
    );
}