import Menu from '../../components/menu';
import Cards from '../../components/cards';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Cards />
            </main>
        </div>
    );
}