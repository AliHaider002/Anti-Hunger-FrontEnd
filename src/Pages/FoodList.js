import Footer from '../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import FoodListContext from '../Components/FoodListComp/FoodListContext'
import HeaderContext from '../Components/Header/HeaderContext'
import Header from '../Components/Header/Header'
const FoodList = () => {
  const params = useParams();
  const id = params;
  return (
    <>
      <Header/>
      <FoodListContext id={id} />
      <Footer />
    </>
  )
}

export default FoodList