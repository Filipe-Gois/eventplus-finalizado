import axios from "axios";

/**
 * Módulo para trabalhar com apis. Disponibiliza as rotas da api bem como o serviço com a biblioteca axios
 */

/**
 * Rota para o recurso Evento
 */
export const eventsResource = "/Evento";
/**
 * Rota para o recurso Listar Minhas Presenças
 */
export const myEventsResource = "/PresencaEvento";
/**
 * Rota para o recurso Presenças Evento
 */
export const presencesEventResource = "/PresencaEvento";
/**
 * Rota para o recurso Presenças Evento
 */
export const commentaryEventResource = "/ComentarioEvento";

export const commentaryEventResourceAI = "/ComentarioEvento/CadastroIa";

/**
 * Rota para o recurso Presenças Evento
 */
export const trueCommentaryEventResource =
  "/ComentarioEvento/ListarSomenteExibe";

/**
 * Rota para o recurso Próximos Eventos
 */
export const nextEventResource = "/Evento/ListarProximos";

/**
 * Rota para o recurso Próximos Eventos
 */
export const oldEventResource = "/Evento/ListarAntigos";
/**
 * Rota para o recurso Tipos de Eventos
 */
export const eventsTypeResource = "/TiposEvento";
/**
 * Rota para o recurso Instituição
 */
export const institutionResource = "/Instituicao";
/**
 * Rota para o recurso Login
 */
export const loginResource = "/Login";

export const usersTypes = "/TiposUsuario";

export const usuario = "/Usuario";

const apiPort = "7118";

const localApiUrl = `http://localhost:${apiPort}/api`;

const externallApiUrl = `https://eventwebapifilipe.azurewebsites.net/api`;
// const externalApiUrl = null;

const api = axios.create({
  baseURL: externallApiUrl,
});

export default api;
