import httpService from "./http.service";

const qualitiesEndpoint = "quality";

const qualitiesService = {
  fetchAll: async () => {
    const { data } = await httpService.get(qualitiesEndpoint);
    return data;
  }
};

export default qualitiesService;
