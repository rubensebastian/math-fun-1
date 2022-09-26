import Menu from '../components/menu';
import Activities from '../components/activities';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Activities />
            </main>
        </div>
    );
}