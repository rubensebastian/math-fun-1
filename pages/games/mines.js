import Menu from '../../components/menu';
import Mine from "../../components/mines";

export default function NimBoard() {
    return (
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Mine />
            </main>
        </div>
    );
}