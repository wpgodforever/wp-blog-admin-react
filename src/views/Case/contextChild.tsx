import { Context } from './useContext';
import { useContext } from 'react';

const contextChild = () => {
    const value = useContext(Context);
    console.log('value', value);
    return (
        <div>
            <h1>Context.Consumer的方式</h1>
            <Context.Consumer>
                {
                    (value) => {
                        return <h2>{value.test}</h2>
                    }
                }
            </Context.Consumer>

            <h1>useContext的方式</h1>
            <h2>{value.test}</h2>

        </div>
    );
}

export default contextChild;