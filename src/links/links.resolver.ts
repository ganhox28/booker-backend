import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetLinksArgs } from './dto/args/get-links-args.dto';
import { Link } from './link.module';
import { LinksService } from './links.service';

@Resolver(() => Link)
export class LinksResolver {
    constructor(private readonly linksService: LinksService) {}

    @Query(() => [Link], { name: 'links' })
    async getLinks(
        @Args() getLinkArgs: GetLinksArgs
    ) {
        return this.linksService.getLinks(getLinkArgs);
    }

}
