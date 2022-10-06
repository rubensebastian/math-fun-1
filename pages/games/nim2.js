import Menu from '../../components/menu';
import Nim2 from '../../components/nim2';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Nim2 />
            </main>
        </div>
    );
}