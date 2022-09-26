import GameBoard from '../../components/cipher';
import Menu from '../../components/menu';

export default function Cipher() {
  return (
    <div>
      <Menu />
      <main>
        <GameBoard />
      </main>
    </div>
  );
}