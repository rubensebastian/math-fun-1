import Menu from '../components/menu';
import About from '../components/about';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <About />
            </main>
        </div>
    );
}