import Menu from '../../components/menu';
import Tic from '../../components/tic';

export default function NimBoard() {
    return(
        <div>
            <nav>
                <Menu />
            </nav>
            <main>
                <Tic />
            </main>
        </div>
    );
}