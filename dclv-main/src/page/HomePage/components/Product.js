import { Grid } from '@material-ui/core'
//import { Link } from 'react-router-dom'
//import ProductRating from 'src/components/ProductRating'
//import path from 'src/constants/path'
//import { Product as ProductType } from 'src/types/product.type'
//import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'src/utils/utils'
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  imageStyled: {
    width: "100%",
    height: "auto"
  }
}));

export default function Product({ product }) {
  const history = useHistory();
  const classes = useStyles();
  const handleClick = (orderId) => {
    console.log(orderId)
    history.push(`/order/orderDetail/${orderId}`);
  }
  return (
    <Grid onClick={() => handleClick(product._id)}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={product.images[0]}
            alt
            // className='absolute top-0 left-0 h-full w-full bg-white object-cover'
            className={classes.imageStyled}
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{product.product_name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>Màu: </span>
              {/* <span className='text-sm'>{formatCurrency(product.price_before_discount)}</span> */}
              <span className='text-sm'>{product.color}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>Chất liệu: </span>
              {/* <span className='text-sm'>{formatCurrency(product.price)}</span> */}
              <span className='text-sm'>{product.Composition}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            {/* <ProductRating rating={product.rating} /> */}
            <div className='ml-2 text-sm'>
              {/* <span>{formatNumberToSocialStyle(product.sold)}</span> */}
              <span>20</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  )
}
