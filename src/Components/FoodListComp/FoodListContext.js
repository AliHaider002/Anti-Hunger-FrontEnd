import React  from 'react'
import FoodListComp from './FoodListComp'

function FoodListContext(props) {
    const { id } = props;
    return (
        <FoodListComp id={id} />
    )
}

export default FoodListContext