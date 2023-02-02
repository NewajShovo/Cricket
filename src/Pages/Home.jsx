import "../App.css";
import Button from '../Component/Button';
const Home =() => {
    return (
        <div className="button-container no-rotation">
            <Button label="Play with Computer" />
            <Button label="Play with Friends" />
            <Button label="Play with Stranger" />
        </div>
    );
  }

  export default Home;