import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';

export default interface UseCase<P, E extends AppException, R> {
  execute(param: P): AsyncResult<E, R>;
}
