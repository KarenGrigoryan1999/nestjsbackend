import {Controller, Delete, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CartService} from "./cart.service";

@Controller('api/cart')
export class CartController {
    constructor(private cartService: CartService) {
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Post("/:id")
    addToCart(@Request() req, @Param("id") id: string) {
        const currentUserId = req.user.id;
        return this.cartService.addToCart(+id, currentUserId);
    }

    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Delete("/:id")
    deleteFromCart(@Request() req, @Param("id") id: string) {
        const currentUserId = req.user.id;
        return this.cartService.deleteFromCart(+id, currentUserId);
    }
    
    @Roles("ADMIN", "STUDENT")
    @UseGuards(RolesGuard)
    @Get()
    getCart(@Request() req) {
        const currentUserId = req.user.id;
        return this.cartService.getCart(currentUserId);
    }
} 
