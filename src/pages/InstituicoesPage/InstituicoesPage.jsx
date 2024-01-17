import React, { useState, useEffect } from "react";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import "./InstituicoesPage.css";
import {
  Input,
  Button,
  Table,
  InputMasked,
} from "../../components/FormComponents/FormComponents";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import Title from "../../components/Title/Title";
import instituicaoImage from "../../assets/images/tipo-evento.svg";
import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";
import eyeIcon from "../../assets/images/eyeIcon.svg";
import api, { institutionResource } from "../../Services/Service";
import {
  cnpjDBToView,
  cnpjMasked,
  cnpjUnMasked,
} from "../../Utils/stringFunctions";

const InstituicoesPage = () => {
  const [tableHead] = useState([
    "Nome Fantasia",
    "Endereço",
    "CNPJ",
    "Editar",
    "Excluir",
  ]);

  const [instituicoes, setInstituicoes] = useState([]);

  const [instituicao, setInstituicao] = useState({
    idInstituicao: null,
    cnpj: "",
    endereco: "",
    nomeFantasia: "",
  });

  const [cnpjValue, setCnpjValue] = useState("");

  const [frmEditData, setFrmEditData] = useState({
    idInstituicao: null,
    cnpj: "",
    endereco: "",
    nomeFantasia: "",
  });
  const [notifyUser, setNotifyUser] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);

  const [frmEdit, setFrmEdit] = useState(false);

  const actionAbort = () => {
    setCnpjValue("");
    setInstituicao({
      ...instituicao,
      idInstituicao: null,
      cnpj: "",
      endereco: "",
      nomeFantasia: "",
    });
    setFrmEditData({
      ...frmEditData,
      id: null,
      endereco: "",
      nomeFantasia: "",
      cnpj: "",
    });
    setFrmEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(institutionResource, {
        nomeFantasia: instituicao.nomeFantasia,
        endereco: instituicao.endereco,
        // cnpj: instituicao.cnpj,
        cnpj: cnpjUnMasked(cnpjValue),
      });

      loadInstituicoes();

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      actionAbort();
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao cadastrar.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  const showUpdateForm = async (id) => {
    setFrmEdit(true);

    try {
      const response = await api.get(institutionResource + "/" + id);

      // const frmEditDataModificado = [];

      // //retorno da api (array tipo de eventos)
      // response.data.forEach((element) => {
      //   frmEditDataModificado.push({
      //     id: element.idInstituicao,
      //     cnpj: element.cnpj,
      //     endereco: element.endereco,
      //     nomeFantasia: element.nomeFantasia,
      //   });
      // });
      // console.log(12124214214123);
      // console.log(frmEditDataModificado);

      setFrmEditData(response.data);
      setCnpjValue(cnpjMasked(response.data.cnpj));
    } catch (error) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    if (
      frmEditData.nomeFantasia.trim().length === 0 ||
      frmEditData.endereco.trim().length === 0 ||
      cnpjValue.trim().length === 0
    ) {
      setNotifyUser({
        titleNote: "Atenção",
        textNote: "Preencha os campos corretamente",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });

      setShowSpinner(false);
      return;
    }

    try {
      const response = await api.put(
        institutionResource + "/" + frmEditData.idInstituicao,
        {
          nomeFantasia: frmEditData.nomeFantasia,
          cnpj: cnpjUnMasked(cnpjValue),
          endereco: frmEditData.endereco,
        }
      );

      if (response.status === 204) {
        actionAbort();
        loadInstituicoes();
        setFrmEdit(false);
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Atualizado com sucesso! (${frmEditData.nomeFantasia})`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      } else {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Problemas ao atualizar.)`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Problemas ao atualizar os dados na tela ou no banco`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  const handleDelete = async (idInstituicao) => {
    if (!window.confirm("Confirma Exclusão?")) {
      return; //retorna a função sem executar o restante do código
    }
    console.log("id da instituição:");
    console.log([...instituicoes.map((inst) => [inst.idInstituicao])]);

    setShowSpinner(true);
    try {
      const response = await api.delete(
        institutionResource + "/" + idInstituicao
      );

      if (response.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso!",
          textNote: "Excluído com sucesso!",
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
        loadInstituicoes();
      }
      //  else {
      //   setNotifyUser({
      //     titleNote: "Erro",
      //     textNote: `Erro ao excluir.`,
      //     imgIcon: "danger",
      //     imgAlt:
      //       "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
      //     showMessage: true,
      //   });
      // }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao excluir.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  const loadInstituicoes = async () => {
    try {
      const response = await api.get(institutionResource);

      const instModificadas = [];

      response.data.forEach((element) => {
        instModificadas.push({
          id: element.idInstituicao,
          cnpj: element.cnpj,
          endereco: element.endereco,
          nomeFantasia: element.nomeFantasia,
        });
      });

      // setIdInstituicoes(instModificadas);
      setInstituicoes(instModificadas);
    } catch (error) {}
  };

  useEffect(() => {
    loadInstituicoes();
  }, []);

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      {/* SPINNER - Feito com position */}
      {showSpinner ? <Spinner /> : null}

      <MainContent>
        {/* formulário de cadastro do tipo do evento */}
        <section className="cadastro-evento-section">
          <Container>
            <Title titleText={"Cadastro de Instituição"} />
            <div className="cadastro-evento__box">
              <ImageIllustrator imageRender={instituicaoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar? */}
                {!frmEdit ? (
                  // Cadastrar
                  <>
                    <Input
                      id="Nome-Fantasia"
                      placeholder="Nome Fantasia"
                      name={"Nome-Fantasia"}
                      type={"text"}
                      required={"required"}
                      value={instituicao.nomeFantasia}
                      manipulationFunction={(e) => {
                        setInstituicao({
                          ...instituicao,
                          nomeFantasia: e.target.value,
                        });
                      }}
                    />
                    <Input
                      id="cnpj"
                      placeholder="CNPJ"
                      name={"cnpj"}
                      type={"text"}
                      required={"required"}
                      value={cnpjValue}
                      manipulationFunction={(e) => {
                        setCnpjValue(cnpjMasked(e.target.value));
                      }}
                    />

                    <Input
                      id="endereco"
                      placeholder="Endereço"
                      name={"endereco"}
                      type={"text"}
                      required={"required"}
                      value={instituicao.endereco}
                      manipulationFunction={(e) => {
                        setInstituicao({
                          ...instituicao,
                          endereco: e.target.value,
                        });
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  // Editar
                  <>
                    <Input
                      id="Nome-Fantasia"
                      placeholder="Nome Fantasia"
                      name={"Nome-Fantasia"}
                      type={"text"}
                      required={"required"}
                      value={frmEditData.nomeFantasia}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          nomeFantasia: e.target.value,
                        });
                      }}
                    />
                    <Input
                      id="cnpj"
                      placeholder="CNPJ"
                      name={"cnpj"}
                      type={"text"}
                      required={"required"}
                      value={cnpjValue}
                      manipulationFunction={(e) => {
                        setCnpjValue(cnpjMasked(e.target.value));
                      }}
                    />
                    <Input
                      id="endereco"
                      placeholder="Endereço"
                      name={"endereco"}
                      type={"text"}
                      required={"required"}
                      value={frmEditData.endereco}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          endereco: e.target.value,
                        });
                      }}
                    />
                    <div className="buttons-editbox">
                      <Button
                        textButton="Atualizar"
                        id="atualizar"
                        name="atualizar"
                        type="submit"
                        additionalClass="button-component--middle"
                      />
                      <Button
                        textButton="Cancelar"
                        id="cancelar"
                        name="cancelar"
                        type="button"
                        manipulationFunction={actionAbort}
                        additionalClass="button-component--middle"
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </Container>
        </section>

        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista De Instituições"} color="white" />

            <Table
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
              showUpdate={true}
              showDelete={true}
              dados={[
                tableHead,
                [
                  ...instituicoes.map((instituicao) => [
                    instituicao.id,
                    instituicao.nomeFantasia,
                    instituicao.endereco,
                    cnpjMasked(instituicao.cnpj),
                  ]),
                ],
              ]}
              addtionalClass={tableHead.length > 3 ? "scroll-vertical" : ""}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default InstituicoesPage;
