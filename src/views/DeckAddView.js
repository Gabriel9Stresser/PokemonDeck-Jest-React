import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import View from "../layout/View";
import Wrapper from "../layout/Wrapper";
import SearchBar from "../components/SearchBar";

import cardStore from '../store/card.store';
import CardGrid from "../components/CardGrid";
import DeckFormProvider, {DeckFormContext} from "../providers/DeckFormProvider";

const DeckAddView = () => {
    const dispatch = useDispatch();
    const cards = useSelector(cardStore.selectors.cards);
    const loading = useSelector(cardStore.selectors.loading);

    const fetchCards = useCallback((query) => {
        const {getCards} = cardStore.actions;
        dispatch(getCards({query}));
    }, [dispatch])

    const search = ({target}) => {
        fetchCards(target.value);
    }

    useEffect(() => {
        fetchCards();
    }, [fetchCards])

    return (
        <Wrapper>
            <View>

                <DeckFormProvider>
                    <DeckFormContext.Consumer>
                        {
                            ({saveDeck}) => <SearchBar
                                buttonLabel={'Salvar Baralho'}
                                onButtonClick={saveDeck}
                                onChange={search}
                            />
                        }
                    </DeckFormContext.Consumer>


                    <CardGrid
                        cards={cards}
                        loading={loading}
                    />
                </DeckFormProvider>

            </View>
        </Wrapper>
    );
};

export default DeckAddView;