import { useSelector, useDispatch } from 'react-redux';
import { callGetMenuDetailAPI } from './../apis/MtvsCafeteriaAPICalls';
import { useEffect } from 'react';

const { useParams, Link } = require("react-router-dom");

function MenuDetails() {

    const {menuCode} = useParams();

    const result = useSelector(state => state.menuReducer);
    const reviewList = result.reviewList?.result;
    const dispatch = useDispatch();
    useEffect(
        ()=>{
            dispatch(callGetMenuDetailAPI(menuCode));
        }
        ,[]
    );
    return (
        <>
            <h2> {result.menu?.menuName}의 리뷰 확인하기</h2>
            <div className='buttonBox'>
                <button onClick={ () => window.location.href=`/review/new/${menuCode}`}>리뷰 작성하기</button>
            </div>
            {result.reviewList?.result.length
            ?   <>
                    <h3> 평균 평점 : {result.reviewList?.avgScore}</h3>
                    <ul>
                        {reviewList?.map(review => { 
                            return (<li key={review.reviewCode} className='reviewCard'>
                                <h4 className='reivewElement'>{review.nickname}님의 리뷰</h4>
                                <h5 className='reivewElement'>평점: {review.reviewScore} </h5>
                                <h5 className='reivewElement'>"{review.reviewDetails}" </h5>
                                <h6 className='reviewElement'>작성한 날짜: {review.insertDate}</h6>
                            </li>);
                        })}
                    </ul>
                </>
            :   
                <>
                    <h3>리뷰가 없습니다. 처음으로 리뷰를 작성해주세요!!</h3>
                    
                </>
            }

        </>

    );

}

export default MenuDetails;