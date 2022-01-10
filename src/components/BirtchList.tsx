import React from 'react';
// import {MyProps, MyState} from '../interfaces/IMyStateBirthList';
class BirthList extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const { births } = this.props;
        return (
            <div>
                <ul>
                    {births.map(data => {
                        return (
                            <li>
                                {data.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default BirthList;