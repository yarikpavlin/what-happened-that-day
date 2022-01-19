import '../style/Component.css'
import React from 'react';
import FeedRepository from '../api/FeedRepository';

class Container extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {
            event: null,
            isLoading: false
        }
    }

    async fetchData() {
        this.updateIsLoading();
        const data = await FeedRepository.getRandomEvent();
        if(data.event) {
            this.setState({
                event: data.event,
                typeOfEvent: data.type
            })
            this.updateIsLoading();
        } else {
            await this.fetchData();
            this.updateIsLoading();
        }
    }

    async componentDidMount() {
        await this.fetchData();
    }

    renderTodayWord() {
        let text = '';
        switch(this.state.typeOfEvent) {
            case 'births':
                text = 'В этот день был день рождения';
                break;
            case 'events':
            case 'holidays':
                    text = 'В этот день';
                break;
        }
        return (
            <p className='today-word'>{text}</p>
        )
    }

    private updateIsLoading() {
        this.setState((prevState, props) => ({
            isLoading: !prevState.isLoading
        }))
    }

    renderLoading() {
        return (
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        );
    }

    renderDetailsLink(event) {
        const pages = event.pages;
        if(pages) {
            return (
                <ul>
                    {pages.slice(0, 3).map(page => {
                        const url = page.content_urls.desktop.page;
                        const title = page.title;
                        return (
                            <li>
                                <a href={url} target="_blank">Подробнее о {title}</a>
                            </li>
                        );
                    })}                        
                </ul>
            );
        }
    }
    
    render() {
        const { event } = this.state;
        return (
            <div className="container">
                <div className='content'>
                    {this.state.isLoading
                        ? this.renderLoading()
                        : <div>
                            {event &&
                            <div className='text-content'>
                                {this.renderTodayWord()}
                                <div className='clickable-event' onClick={() => this.fetchData()}>
                                    <p>{event.text}</p>
                                </div>
                                {this.renderDetailsLink(event)}
                            </div>
                            }       
                        </div>
                    }
            </div>
            </div>
        );
    }
}

export default Container;