import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { GqlExceptionFilter } from "@nestjs/graphql";
import { ApolloError } from "apollo-server-core";

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, _: ArgumentsHost) {
        throw new ApolloError(exception.message, `${exception.getStatus()}`, exception);
    }
}
