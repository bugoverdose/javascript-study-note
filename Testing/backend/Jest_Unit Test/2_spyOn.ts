/*
  Spy Function : 서비스 내부에 침입하여 특정 코드의 실행 방식을 직접 지정하는 방법.  
  - 주의: async 메서드 여부 확인.

  1) error : 특정 함수 실행되었을 때 에러발생하도록.
  jest.spyOn(service, 'getPodcast').mockImplementation(async () => {
    throw new Error();
  });
    
  2) return : 특정 함수 실행되었을 때 특정 값 return하도록.
  jest.spyOn(service, 'getPodcast').mockImplementation(async () => {
    return { ok: false, error: `Podcast with id ${podcast.id} not found` };
  });
*/
// [podcasts.service.spec.ts] 특정 메서드 실행시 catch문에 도달하도록 하는 방법.
describe("PodcastsService", () => {
  let service: PodcastsService;
  // ~~
  describe("getEpisodes", () => {
    // ~~
    it("should fail on exception", async () => {
      jest.spyOn(service, "getPodcast").mockImplementation(async () => {
        throw Error();
      });
      const result = await service.getEpisodes(1);
      expect(result).toEqual({
        ok: false,
        error: "Internal server error occurred.",
      });
    });
  });
});

// =============================================================================
// [podcasts.service.ts]
@Injectable()
export class PodcastsService {
  async getEpisodes(podcastId: number): Promise<EpisodesOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      return { ok: true, episodes: podcast.episodes };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }
}
// =============================================================================
