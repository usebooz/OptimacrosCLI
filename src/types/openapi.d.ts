import type {
  AxiosRequestConfig,
  OpenAPIClient,
  OperationResponse,
  Parameters,
} from "openapi-client-axios";

declare namespace Components {
  namespace Parameters {
    export type CarFilter = Record<string, string>;
    // {
    // brand?: string;
    // model?: string;
    // color?: string;
    // year?: number;
    // price?: number;
    // }

    // export type CarId = string; // ^[0-9a-fA-F]{24}$
    export type CarSort = string[];
    // (
    //   | "brand"
    //   | "model"
    //   | "color"
    //   | "year"
    //   | "price"
    //   | "-brand"
    //   | "-model"
    //   | "-color"
    //   | "-year"
    //   | "-price"
    // )
  }

  // export interface PathParameters {
  //   carId?: Parameters.CarId /* ^[0-9a-fA-F]{24}$ */;
  // }

  // export interface QueryParameters {
  //   carFilter?: Parameters.CarFilter;
  //   carSort?: Parameters.CarSort;
  // }

  namespace RequestBodies {
    export type Car = /* cars */ Schemas.Car;
    export type User = /* users */ Schemas.User;
  }
  namespace Responses {
    export type Car = /* cars */ Schemas.Car;
    export type Cars = /* cars */ Schemas.Car[];
    // export type Error = Schemas.Error;
    export type Token = Schemas.Token;
  }
  namespace Schemas {
    /**
     * cars
     */
    export interface Car extends Record<string, string | number> {
      brand: string;
      model: string;
      color: string;
      year: number | string;
      price: number | string;
    }

    export interface Error {
      message: string;
    }

    export interface Token {
      token: string;
    }

    /**
     * users
     */
    export interface User extends Record<string, string | number> {
      username: string;
      password: string;
    }
  }
}
declare namespace Paths {
  namespace CreateCar {
    export type RequestBody = Components.RequestBodies.Car;
    namespace Responses {
      export type $201 = Components.Responses.Car;
    }
  }
  namespace DeleteCarById {
    namespace Parameters {
      // type $0 = Components.Parameters.CarId /* ^[0-9a-fA-F]{24}$ */;
    }
    namespace Responses {
      export type $204 = Components.Responses.NoContent;
      // export type $404 = Components.Responses.Error;
    }
  }
  namespace GetCarById {
    namespace Parameters {
      // export type $0 = Components.Parameters.CarId /* ^[0-9a-fA-F]{24}$ */;
    }
    namespace Responses {
      export type $200 = Components.Responses.Car;
      // export type $404 = Components.Responses.Error;
    }
  }
  namespace GetCars {
    namespace Parameters {
      // export type $0 = Components.Parameters.CarFilter;
      // export type $1 = Components.Parameters.CarSort;
    }
    namespace Responses {
      export type $200 = Components.Responses.Cars;
      // export type $404 = Components.Responses.Error;
    }
  }
  namespace Login {
    export type RequestBody = Components.RequestBodies.User;
    namespace Responses {
      export type $200 = Components.Responses.Token;
      // export type $401 = Components.Responses.Error;
    }
  }
  namespace UpdateCarById {
    namespace Parameters {
      // export type $0 = Components.Parameters.CarId /* ^[0-9a-fA-F]{24}$ */;
    }
    export type RequestBody = Components.RequestBodies.Car;
    namespace Responses {
      export type $200 = Components.Responses.Car;
      // export type $404 = Components.Responses.Error;
    }
  }
}

export interface OperationMethods {
  /**
   * login - Login user
   */
  "login"(
    parameters?: null,
    data?: Paths.Login.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.Login.Responses.$200>;

  /**
   * getCars - Get a list of cars
   */
  "getCars"(
    parameters?: Parameters<Paths.GetCars.Parameters> | null,
    data?: never,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetCars.Responses.$200>;

  /**
   * createCar - Create a car
   */
  "createCar"(
    parameters?: Parameters<null> | null,
    data?: Paths.CreateCar.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateCar.Responses.$201>;

  /**
   * getCarById - Get car by id
   */
  "getCarById"(
    parameters?: Parameters<Paths.GetCarById.Parameters> | null,
    data?: null,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetCarById.Responses.$200>;

  /**
   * updateCarById - Update car by id
   */
  "updateCarById"(
    parameters?: Parameters<Paths.UpdateCarById.Parameters> | null,
    data?: Paths.UpdateCarById.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateCarById.Responses.$200>;

  /**
   * deleteCarById - Delete car by id
   */
  "deleteCarById"(
    parameters?: Parameters<Paths.DeleteCarById.Parameters> | null,
    data?: null,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteCarById.Responses.$204>;
}

export interface PathsDictionary {
  ["/login"]: {
    /**
     * login - Login user
     */
    "post"(
      parameters?: Parameters<null> | null,
      data?: Paths.Login.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.Login.Responses.$200>;
  };
  ["/cars"]: {
    /**
     * getCars - Get a list of cars
     */
    "get"(
      parameters?: Parameters<Paths.GetCars.Parameters> | null,
      data?: never,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetCars.Responses.$200>;
    /**
     * createCar - Create a car
     */
    "post"(
      parameters?: Parameters<Paths.CreateCar.Parameters> | null,
      data?: Paths.CreateCar.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateCar.Responses.$201>;
  };
  ["/cars/{id}"]: {
    /**
     * getCarById - Get car by id
     */
    "get"(
      parameters?: Parameters<Paths.GetCarById.Parameters> | null,
      data?: never,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetCarById.Responses.$200>;
    /**
     * updateCarById - Update car by id
     */
    "patch"(
      parameters?: Parameters<Paths.UpdateCarById.Parameters> | null,
      data?: Paths.UpdateCarById.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateCarById.Responses.$200>;
    /**
     * deleteCarById - Delete car by id
     */
    "delete"(
      parameters?: Parameters<Paths.DeleteCarById.Parameters> | null,
      data?: never,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteCarById.Responses.$204>;
  };
}

export type OptimacrosAPIClient = OpenAPIClient<
  OperationMethods,
  PathsDictionary
>;
