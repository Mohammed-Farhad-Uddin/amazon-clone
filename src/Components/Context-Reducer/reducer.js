export const initialState={
    basket: [],
    user:null,
}

//Selector reduce kore sum ber kora
export const getBasketTotal=(basket)=>{ // return na dile value undefine asbe
    // basket  ? basket.reduce()
    // return basket?.reduce((amount,item)=>item.price + amount,0);
    return basket?.reduce((amount,item)=>{ //item means basket purota and tar modde basket.price=item.price
        return amount+item.price  //ei kane amount holo 0. kono kicur sum ber korte reduce use kore
    },0)
}


const reducer =(state,action)=>{
    console.log(action);
        switch(action.type){
            case "ADD_TO_BASKET":
                return {
                    ...state,
                    basket: [...state.basket, action.item],
                }
            case "REMOVE_FROM_BASKET":
                // return {
                // id number same product e sob somoi ekoi takle ei ta korle sob remove hobe oi id wala sob
                //    <----- jodi ei rkm kori taile same product 2/3 bar add kora takle ek ta remove korle same id er 2/3 bar add kora basket tekhe sob gula remove hoye jabe
                //     ...state,
                //     basket: state.basket.filter(item=> item.id !== action.id)
                //     //action.id er sathe basket er jei id mil gula baad diye omil gula filter kore rako 
                //     ///action.id er sathe basket er jei id milbe oi ta chara baki gula filter kore basket e rako.        
                // }----->


                //same id er product holeo jkn jei ta remove korbo oi ta renove hobe
                const index=state.basket.findIndex((basketItem)=> basketItem.id === action.id); //same id er findIndex kore first jei ta pabe oi tai remove korbe
                let newBasket=[...state.basket];
                    if(index>=0){
                        newBasket.splice(index,1);//index number tar oi kan tekhe 1 ta splice kore sorai dibe
                    }else{
                        console.warn(`Can't remove Product (id:${action.id}) as it's not in the basket!`)
                    }
                return{
                    ...state,
                    basket:newBasket
                }
            case "SET_USER":
                return{
                    ...state,
                    user:action.user,
                }
            default: 
               return state;
        }
}

export default reducer;