import Menu from '../../components/menu';
import Nim from '../../components/nim';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Nim />
            </main>
        </div>
    );
}