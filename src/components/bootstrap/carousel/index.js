import React from 'react'

export default({
    id = '',
    images = [],
    interval = 5000,
    control = false
}) => {
    return (<div id={id} className="carousel slide" data-ride="carousel" data-interval={interval}>
        <div className="carousel-inner">
            {
                images.map((item, index) => {
                    let class_option = (index == 0 ? "carousel-item active" : "carousel-item");
                    console.log(typeof(item));
                    let img_src = `${item}`;
                    return (
                        <div className={class_option} key={index}>
                            <img className="d-block w-100" src={img_src}/>
                        </div>
                    );
                })
            }

            {/*<div className="carousel-item active">
                <img className="d-block w-100" src={require('../../../../images/carousel_1.jpg')}/>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src={require('../../../../images/carousel_2.jpg')}/>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src={require('../../../../images/carousel_3.jpg')}/>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src={require('../../../../images/carousel_4.jpg')}/>
            </div>*/}

        </div>
        {
            control
                ? <div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                : null
        }

    </div>)
}
