import {CardContainer} from "../../components/card-container/card-container.tsx";
import "./home-page.css";

const HomePage = () => {

    return (
        <main className='main'>
            <section  className='section__cards'>
                <CardContainer/>
            </section>
        </main>
    );
};

export default HomePage;