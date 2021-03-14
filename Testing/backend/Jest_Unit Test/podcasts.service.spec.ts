import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('PodcastsService', () => {
  let service: PodcastsService;
  let podcastRepo: MockRepository<Podcast>;
  let episodeRepo: MockRepository<Episode>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PodcastsService,
        { provide: getRepositoryToken(Podcast), useValue: mockRepository() },
        { provide: getRepositoryToken(Episode), useValue: mockRepository() },
      ],
    }).compile();
    service = module.get<PodcastsService>(PodcastsService);
    podcastRepo = module.get(getRepositoryToken(Podcast));
    episodeRepo = module.get(getRepositoryToken(Episode));
  });

  describe('getAllPodcasts', () => {
    it('should get all podcasts', async () => {
      podcastRepo.find.mockResolvedValue(['podcast1', 'podcast2']);
      const result = await service.getAllPodcasts();
      expect(result).toEqual({ ok: true, podcasts: ['podcast1', 'podcast2'] });
    });

    it('should fail on exception', async () => {
      podcastRepo.find.mockRejectedValue(new Error());
      const result = await service.getAllPodcasts();
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('createPodcast', () => {
    const createPodcastInput = {
      title: 'podcast1',
      category: 'gore',
    };
    const createdPodcastEntity = {
      id: 1,
      createdAt: 123,
      updatedAt: 123,
      ...createPodcastInput,
    };

    it('should create a podcast', async () => {
      podcastRepo.create.mockResolvedValue(createdPodcastEntity);
      podcastRepo.save.mockResolvedValue(createdPodcastEntity);
      const result = await service.createPodcast(createPodcastInput);
      expect(result).toMatchObject({ ok: true, id: createdPodcastEntity.id });

      expect(podcastRepo.create).toHaveBeenCalledTimes(1);
      expect(podcastRepo.create).toHaveBeenCalledWith({
        title: createPodcastInput.title,
        category: createPodcastInput.category,
      });
      expect(podcastRepo.save).toHaveBeenCalledTimes(1);
      expect(podcastRepo.save).toHaveBeenCalledWith(
        new Promise(() => createdPodcastEntity),
      );
    });

    it('should fail on exception', async () => {
      podcastRepo.create.mockResolvedValue(new Promise(() => new Error()));
      const result = await service.createPodcast(createPodcastInput);
      expect(result).toMatchObject({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('getPodcast', () => {
    it('should get the found podcast', async () => {
      podcastRepo.findOne.mockResolvedValue('podcastWithId1');
      const result = await service.getPodcast(1);
      expect(result).toEqual({ ok: true, podcast: 'podcastWithId1' });
      expect(podcastRepo.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepo.findOne).toHaveBeenCalledWith(
        { id: 1 },
        { relations: ['episodes'] },
      );
    });

    it('should fail on podcast not found', async () => {
      podcastRepo.findOne.mockResolvedValue(undefined);
      const result = await service.getPodcast(1);
      expect(result).toEqual({
        ok: false,
        error: `Podcast with id ${1} was not found`,
      });
      expect(podcastRepo.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepo.findOne).toHaveBeenCalledWith(
        { id: 1 },
        { relations: ['episodes'] },
      );
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockRejectedValue(new Error());
      const result = await service.getPodcast(1);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('deletePodcast', () => {
    it('should delete the found podcast', async () => {
      podcastRepo.findOne.mockResolvedValue('podcastWithId1');
      podcastRepo.delete.mockResolvedValue('deleted podcastWithId1');
      const result = await service.deletePodcast(1);
      expect(result).toEqual({ ok: true });
      expect(podcastRepo.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepo.findOne).toHaveBeenCalledWith(
        { id: 1 },
        { relations: ['episodes'] },
      );
      expect(podcastRepo.delete).toHaveBeenCalledTimes(1);
      expect(podcastRepo.delete).toHaveBeenCalledWith({ id: 1 });
    });

    it('should fail on podcast not found', async () => {
      podcastRepo.findOne.mockResolvedValue(undefined);
      const result = await service.deletePodcast(1);
      expect(result).toEqual({
        ok: false,
        error: `Podcast with id ${1} was not found`,
      });
      expect(podcastRepo.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepo.findOne).toHaveBeenCalledWith(
        { id: 1 },
        { relations: ['episodes'] },
      );
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockResolvedValue('podcastWithId1');
      podcastRepo.delete.mockRejectedValue(new Error());
      const result = await service.deletePodcast(1);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('updatePodcast', () => {
    const currentPodcast = {
      id: 1,
      title: 'current title',
      category: 'current category',
      rating: 3,
    };

    const updatePodcastInput1 = {
      id: 1,
      payload: {
        title: 'updated title',
        category: 'updated category',
      },
    };
    const updatePodcastInput2 = {
      id: 1,
      payload: {
        title: 'updated title',
        category: 'updated category',
        rating: 1,
      },
    };
    const updatedPodcast1 = {
      ...currentPodcast,
      ...updatePodcastInput1.payload,
    };
    const updatedPodcast2 = {
      ...currentPodcast,
      ...updatePodcastInput2.payload,
    };

    it('should fail on podcast not found', async () => {
      podcastRepo.findOne.mockResolvedValue(undefined);
      const result = await service.updatePodcast(updatePodcastInput1);
      expect(result).toEqual({
        ok: false,
        error: `Podcast with id ${1} was not found`,
      });
    });

    it('should fail if rating in payload is lt 1 or gt 5', async () => {
      podcastRepo.findOne.mockResolvedValue(currentPodcast);
      const result = await service.updatePodcast({
        id: 1,
        payload: { rating: 0 },
      });
      expect(result).toEqual({
        ok: false,
        error: 'Rating must be between 1 and 5.',
      });
    });

    it('should update the podcast (not including rating)', async () => {
      podcastRepo.findOne.mockResolvedValue(currentPodcast);
      podcastRepo.save.mockResolvedValue(updatedPodcast1);
      const result = await service.updatePodcast(updatePodcastInput1);
      expect(result).toEqual({ ok: true });
      expect(podcastRepo.findOne).toBeCalledTimes(1);
      expect(podcastRepo.save).toBeCalledTimes(1);
      expect(podcastRepo.save).toBeCalledWith(updatedPodcast1);
    });

    it('should update the found podcast (including rating)', async () => {
      podcastRepo.findOne.mockResolvedValue(currentPodcast);
      podcastRepo.save.mockResolvedValue(updatedPodcast2);
      const result = await service.updatePodcast(updatePodcastInput2);
      expect(result).toEqual({ ok: true });
      expect(podcastRepo.findOne).toBeCalledTimes(1);
      expect(podcastRepo.save).toBeCalledTimes(1);
      expect(podcastRepo.save).toBeCalledWith(updatedPodcast2);
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockResolvedValue(currentPodcast);
      podcastRepo.save.mockRejectedValue(new Error());
      const result = await service.updatePodcast(updatePodcastInput1);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('getEpisodes', () => {
    it('should get the episodes of found podcast', async () => {
      podcastRepo.findOne.mockResolvedValue({
        id: 1,
        episodes: ['ep1', 'ep2'],
      });
      const result = await service.getEpisodes(1);
      expect(result).toEqual({ ok: true, episodes: ['ep1', 'ep2'] });
      expect(podcastRepo.findOne).toHaveBeenCalledTimes(1);
      expect(podcastRepo.findOne).toHaveBeenCalledWith(
        { id: 1 },
        { relations: ['episodes'] },
      );
    });

    it('should fail on podcast not found', async () => {
      podcastRepo.findOne.mockResolvedValue(undefined);
      const result = await service.getEpisodes(1);
      expect(result).toEqual({
        ok: false,
        error: `Podcast with id ${1} was not found`,
      });
    });

    it('should fail on exception', async () => {
      jest.spyOn(service, 'getPodcast').mockImplementation(async () => {
        throw Error();
      });
      const result = await service.getEpisodes(1);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('getEpisode', () => {
    it('should get the episode from podcast', async () => {
      podcastRepo.findOne.mockResolvedValue({
        id: 1,
        episodes: [{ id: 1 }, { id: 2 }],
      });
      const result = await service.getEpisode({ podcastId: 1, episodeId: 1 });
      expect(result).toEqual({ ok: true, episode: { id: 1 } });
    });

    it('should fail if failed to get episode from podcast ', async () => {
      podcastRepo.findOne.mockResolvedValue({
        id: 1,
        episodes: [{ id: 1 }, { id: 2 }],
      });
      const result = await service.getEpisode({ podcastId: 1, episodeId: 5 });
      expect(result).toEqual({
        ok: false,
        error: `Episode with id ${5} not found in podcast with id ${1}`,
      });
    });

    it('should fail if failed to get episodes or podcast ', async () => {
      podcastRepo.findOne.mockResolvedValue({
        id: 1,
      });
      const result = await service.getEpisode({ podcastId: 1, episodeId: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockRejectedValue(new Error());
      const result = await service.getEpisode({ podcastId: 1, episodeId: 1 });
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('createEpisode', () => {
    const createEpisodeInput = {
      podcastId: 1,
      title: 'Episode1',
      category: 'gore',
    };
    const createdEpisode = {
      id: 5,
      createdAt: 123,
      updatedAt: 123,
      ...createEpisodeInput,
    };
    const existingPodcast = { id: 1, episodes: [] };

    it('should create episode in the podcast', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.create.mockResolvedValue(createdEpisode);
      episodeRepo.save.mockResolvedValue(createdEpisode);
      const result = await service.createEpisode(createEpisodeInput);
      expect(result).toEqual({ ok: true, id: createdEpisode.id });
      expect(podcastRepo.findOne).toBeCalledTimes(1);
      expect(podcastRepo.findOne).toBeCalledWith(
        { id: createEpisodeInput.podcastId },
        { relations: ['episodes'] },
      );
      expect(episodeRepo.create).toBeCalledTimes(1);
      expect(episodeRepo.create).toBeCalledWith({
        title: createEpisodeInput.title,
        category: createEpisodeInput.category,
      });
      expect(episodeRepo.save).toBeCalledTimes(1);
      // expect(episodeRepo.save).toBeCalledWith({~})
    });

    it('should if no podcast found', async () => {
      podcastRepo.findOne.mockResolvedValue(undefined);
      const result = await service.createEpisode(createEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: `Podcast with id 1 was not found`,
      });
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.create.mockResolvedValue(new Promise(() => new Error()));
      const result = await service.createEpisode(createEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('deleteEpisode', () => {
    const deleteEpisodeInput = {
      podcastId: 1,
      episodeId: 2,
    };
    const existingPodcast = {
      id: 1,
      episodes: [{ id: 1 }, { id: 2 }],
    };

    it('should delete episode in the podcast', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.delete.mockResolvedValue('deleted episodeWithId1');
      const result = await service.deleteEpisode(deleteEpisodeInput);
      expect(result).toEqual({ ok: true });
      expect(episodeRepo.delete).toHaveBeenCalledTimes(1);
      expect(episodeRepo.delete).toHaveBeenCalledWith({
        id: deleteEpisodeInput.episodeId,
      });
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockRejectedValue(new Error());
      const result = await service.deleteEpisode(deleteEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.delete.mockRejectedValue(new Error());
      const result = await service.deleteEpisode(deleteEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });

  describe('updateEpisode', () => {
    const currentEpisode = {
      id: 3,
      title: 'current title',
      category: 'current category',
      rating: 3,
    };
    const existingPodcast = {
      id: 1,
      episodes: [{ id: 1 }, currentEpisode],
    };
    const noEpisodesPodcast = {
      id: 1,
      episodes: [],
    };
    const updateEpisodeInput = {
      podcastId: 1,
      episodeId: 3,
      title: 'updated title',
      category: 'updated category',
    };

    const updatedEpisode = {
      ...currentEpisode,
      title: updateEpisodeInput.title,
      category: updateEpisodeInput.category,
    };

    it('should update episode in the podcast', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.save.mockResolvedValue(updatedEpisode);
      const result = await service.updateEpisode(updateEpisodeInput);
      expect(result).toEqual({ ok: true });
    });

    it('should fail if ok is returned false', async () => {
      podcastRepo.findOne.mockResolvedValue(noEpisodesPodcast);
      const result = await service.updateEpisode(updateEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: `Episode with id ${updateEpisodeInput.episodeId} not found in podcast with id ${updateEpisodeInput.podcastId}`,
      });
    });

    it('should fail on exception', async () => {
      podcastRepo.findOne.mockResolvedValue(existingPodcast);
      episodeRepo.save.mockRejectedValue(new Error());
      const result = await service.updateEpisode(updateEpisodeInput);
      expect(result).toEqual({
        ok: false,
        error: 'Internal server error occurred.',
      });
    });
  });
});
