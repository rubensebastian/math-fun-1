import Menu from '../../components/menu';
import Nonogram from '../../components/nonogram';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Nonogram />
            </main>
        </div>
    );
}