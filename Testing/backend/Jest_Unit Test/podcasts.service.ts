import { Injectable } from '@nestjs/common';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import { UpdateEpisodeInput } from './dtos/update-episode.dto';
import { UpdatePodcastInput } from './dtos/update-podcast.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { CoreOutput } from '../common/dtos/output.dto';
import {
  PodcastOutput,
  EpisodesOutput,
  EpisodesSearchInput,
  GetAllPodcastsOutput,
  GetEpisodeOutput,
} from './dtos/podcast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  private readonly InternalServerErrorOutput = {
    ok: false,
    error: 'Internal server error occurred.',
  };

  async getAllPodcasts(): Promise<GetAllPodcastsOutput> {
    try {
      const podcasts = await this.podcastRepository.find();
      return { ok: true, podcasts }; // 주의: podcast 내부의 episodes는 담기지 않음.
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async createPodcast({
    title,
    category,
  }: CreatePodcastInput): Promise<CreatePodcastOutput> {
    try {
      const newPodcast = this.podcastRepository.create({ title, category });
      const { id } = await this.podcastRepository.save(newPodcast);
      return { ok: true, id };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne(
        { id },
        { relations: ['episodes'] },
      );
      if (!podcast) {
        return { ok: false, error: `Podcast with id ${id} was not found` };
      }
      return { ok: true, podcast };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async deletePodcast(id: number): Promise<CoreOutput> {
    try {
      const { ok, error } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      await this.podcastRepository.delete({ id });
      return { ok };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async updatePodcast({
    id,
    payload,
  }: UpdatePodcastInput): Promise<CoreOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) {
        return { ok, error };
      }
      if (typeof payload.rating === 'number') {
        if (payload.rating < 1 || payload.rating > 5) {
          return {
            ok: false,
            error: 'Rating must be between 1 and 5.',
          };
        }
      }
      const updatedPodcast: Podcast = { ...podcast, ...payload };
      await this.podcastRepository.save(updatedPodcast);
      return { ok };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

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

  async getEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<GetEpisodeOutput> {
    try {
      const { episodes, ok, error } = await this.getEpisodes(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const episode = episodes.find((episode) => episode.id === episodeId);
      if (!episode) {
        return {
          ok: false,
          error: `Episode with id ${episodeId} not found in podcast with id ${podcastId}`,
        };
      }
      return { ok: true, episode };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async createEpisode({
    podcastId,
    title,
    category,
  }: CreateEpisodeInput): Promise<CreateEpisodeOutput> {
    try {
      const { podcast, ok, error } = await this.getPodcast(podcastId);
      if (!ok) {
        return { ok, error };
      }
      const newEpisode = this.episodeRepository.create({ title, category });
      newEpisode.podcast = podcast;
      const { id } = await this.episodeRepository.save(newEpisode);
      return { ok: true, id };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async deleteEpisode({
    podcastId,
    episodeId,
  }: EpisodesSearchInput): Promise<CoreOutput> {
    try {
      const { episode, error, ok } = await this.getEpisode({
        podcastId,
        episodeId,
      });
      if (!ok) {
        return { ok, error };
      }
      await this.episodeRepository.delete({ id: episode.id });
      return { ok: true };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }

  async updateEpisode({
    podcastId,
    episodeId,
    ...payload
  }: UpdateEpisodeInput): Promise<CoreOutput> {
    try {
      const { episode, ok, error } = await this.getEpisode({
        podcastId,
        episodeId,
      });
      if (!ok) {
        return { ok, error };
      }
      const updatedEpisode = { ...episode, ...payload };
      await this.episodeRepository.save(updatedEpisode);
      return { ok: true };
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }
}
