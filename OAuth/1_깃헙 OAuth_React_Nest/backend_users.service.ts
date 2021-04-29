import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import fetch from "node-fetch";
import { Repository } from "typeorm";
import { GetGithubTokenInput, GetGithubTokenOutput } from "./dtos/github-token";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>
  ) {}
  private readonly InternalServerErrorOutput = {
    ok: false,
    error: "Internal server error occurred.",
  };

  async getGithubToken({
    code,
  }: GetGithubTokenInput): Promise<GetGithubTokenOutput> {
    try {
      const baseUrl = "https://github.com/login/oauth/access_token";
      const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      };
      const params = new URLSearchParams(config).toString();
      const finalUrl = `${baseUrl}?${params}`; // https://github.com/login/oauth/access_token?client_id=c1e5dca14ce2eec5f4db&client_secret=9c03b3c70393745f9399349903450108fafbfade&code=51fee7fc5612abee9e2e
      const tokenRequest = await fetch(finalUrl, {
        method: "POST", // npm i node-fetch
        headers: { Accept: "application/json" },
      });
      const tokenJson = await tokenRequest.json();
      console.log(tokenJson);
      //  {  access_token: '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',
      //     token_type: 'bearer', scope: 'read:user' }

      if ("access_token" in tokenJson) {
        const { access_token } = tokenJson;
        const userRequest = await fetch("https://api.github.com/user", {
          headers: { Authorization: `token ${access_token}` },
        });
        const foundUser = await userRequest.json();
        console.log(foundUser);
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Failed to get an access token with the given code",
        };
      }
    } catch (e) {
      return this.InternalServerErrorOutput;
    }
  }
}
// console.log(foundUser); // id & avatar_url & name
// {
//     login: 'bugoverdose',
//     id: 73531614,
//     node_id: 'MDQ6VXNlcjczNTMxNjE0',
//     avatar_url: 'https://avatars.githubusercontent.com/u/73531614?v=4',
//     gravatar_id: '',
//     url: 'https://api.github.com/users/bugoverdose',
//     html_url: 'https://github.com/bugoverdose',
//     followers_url: 'https://api.github.com/users/bugoverdose/followers',
//     following_url: 'https://api.github.com/users/bugoverdose/following{/other_user}',
//     gists_url: 'https://api.github.com/users/bugoverdose/gists{/gist_id}',
//     starred_url: 'https://api.github.com/users/bugoverdose/starred{/owner}{/repo}',
//     subscriptions_url: 'https://api.github.com/users/bugoverdose/subscriptions',
//     organizations_url: 'https://api.github.com/users/bugoverdose/orgs',
//     repos_url: 'https://api.github.com/users/bugoverdose/repos',
//     events_url: 'https://api.github.com/users/bugoverdose/events{/privacy}',
//     received_events_url: 'https://api.github.com/users/bugoverdose/received_events',
//     type: 'User',
//     site_admin: false,
//     name: 'Jeong Jinwoo',
//     company: null,
//     blog: '',
//     location: 'Seoul, S. Korea',
//     email: null,
//     hireable: null,
//     bio: 'Web Developer',
//     twitter_username: null,
//     public_repos: 5,
//     public_gists: 0,
//     followers: 12,
//     following: 19,
//     created_at: '2020-10-27T11:28:01Z',
//     updated_at: '2021-04-29T07:47:16Z',
//     private_gists: 0,
//     total_private_repos: 32,
//     owned_private_repos: 32,
//     disk_usage: 43341,
//     collaborators: 0,
//     two_factor_authentication: false,
//     plan: {
//       name: 'pro',
//       space: 976562499,
//       collaborators: 0,
//       private_repos: 9999
//     }
//   }
