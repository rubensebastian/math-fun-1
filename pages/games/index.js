import Menu from '../../components/menu';
import Games from '../../components/games';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Games />
            </main>
        </div>
    );
}