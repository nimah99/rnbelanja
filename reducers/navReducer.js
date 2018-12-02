import {Appsn} from '../tabnavigation';
import { NavigationActions } from 'react-navigation';
const NavReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'goToHome':
            newState = Appsn.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Home' }),
                state
            );
            break;
         case 'goToInput':
            newState = Appsn.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Input' }),
                state
            );
            break;
        case 'goToDetail':
            newState = Appsn.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Detail' }),
                state
            );
            break;
        case 'goToDetailProduk':
            newState = Appsn.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'DetailProduk' }),
                state
            );
            break;
        case 'goToEditProduk':
        newState = Appsn.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'EditProduk' }),
              state
        );
        break;
        default:
            newState = Appsn.router.getStateForAction(action, state);
            break;
    }

    return newState || state;
};

export default NavReducer;