import Menu from '../../components/menu';
import Connect from '../../components/connect';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Connect />
            </main>
        </div>
    );
}