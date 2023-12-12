import React, { useContext, useEffect } from 'react';
import "./DetalhesEventoPage.css"
import api, { commentaryEventResource, trueCommentaryEventResource } from '../../Services/Service';
import MainContent from '../../components/MainContent/MainContent';
import Container from '../../components/Container/Container';
import Title from '../../components/Title/Title';
import { UserContext } from '../../context/AuthContext';

const DetalhesEventoPage = () => {

    const { userData } = useContext(UserContext)

    const loadCommentaries = async () => {

        if (userData.nome && userData.userId === "Administrador") {
            const responseAllCommentarys = await api.get(commentaryEventResource);
        }

        else {
            const responseTrueCommentarys = await api.get(trueCommentaryEventResource);
        }


    }

    const loadTrueCommentarys = async () => {

    }

    useEffect(() => {
        loadCommentaries()


    }, [])
    return (
        <MainContent>

            <Container>

                <Title titleText={"Comentários de Eventos"} additionalClass="custom-title" />

                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nostrum pariatur eligendi autem unde repudiandae vel sit sunt non ipsam magnam maxime soluta voluptatem quidem asperiores tenetur, rerum consequuntur laudantium!</h1>


            </Container>

        </MainContent>
    );
};

export default DetalhesEventoPage;