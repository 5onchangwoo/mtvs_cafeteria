const httpStatus = require('http-status');
const ReviewReqDTO = require('../dto/request/review-req-dto.js');
const ReviewService = require('../services/reivew-service.js');


exports.findReviewListByMenuCode = async (req, res, next) => {
    const menuCode = req.params.menuCode;
    const rawCount = 40;
    const offset = parseInt(req.query.offset || '0');
    const limit = parseInt(req.query.limit || rawCount);

    const results = await ReviewService.findReviewListByMenuCode(menuCode)

    console.log(offset, limit);
    res.status(httpStatus.OK).json(results);
}

exports.newReivew = async (req, res, next) => {
    const {nickname, password, score, details, menuCode} = req.body;
    const clientIp = req.connection.remoteAddress; // req.ip
    const host = `http://${req.headers.host}`;
    const insertDate = new Date()
    // console.log(req.ip);
    try{
        if(nickname && password && score && details && menuCode){
            const reviewReqDTO = new ReviewReqDTO(menuCode, nickname, password, score, details, clientIp, insertDate);
            console.log(reviewReqDTO);
            const insertedId = await ReviewService.newReivew(reviewReqDTO);
            return res.status(httpStatus.CREATED).json({results:"success", insertedId:menuCode});
        }
        throw {errCode: -9998, errMessage: "값이 비어있습니다."};
    } catch(err){
        if(err.message?.match("ER_DUP_ENTRY")){
            return res.status(httpStatus.CONFLICT).json({results:"error", code:-9999, message: '같은 ip는 하나의 메뉴에 한개의 리뷰만 가능합니다.'})
        }
        return res.status(httpStatus.BAD_REQUEST).json({results:"error", code: err.errCode, message: err.errMessage})
    }
    // console.log(reviewReqDTO.clientIp.length);
    
    // const results = await ReviewService.newReivew.()
}