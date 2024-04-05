import home from './home.svg';
import store from './store-solid.svg';
import rewardCard from './reward_card.svg';

export const TabsSet = {
    home,
    store,
    rewardCard
}

export type TabSetType =  keyof typeof TabsSet