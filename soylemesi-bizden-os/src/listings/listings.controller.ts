import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get('search')
  async search(@Query() query: any) {
    return this.listingsService.searchAssets(query);
  }

  @Get()
  async getAll() {
    return this.listingsService.getAllListings();
  }

  @Post()
  async create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.createListing(createListingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listingsService.deleteListing(id);
  }
}
