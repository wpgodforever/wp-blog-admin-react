import { Context } from './useContext';

const contextChild = () => {
    return (
        <div>
            <h1>Context Child</h1>
            <Context.Consumer>
                {
                    (value) => {
                        return <h2>{value.test}</h2>
                    }
                }
            </Context.Consumer>

        </div>
    );
}

export default contextChild;